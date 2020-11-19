import { TestBed, inject } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpMocker } from '../utils/http-mocker';
import { throwError } from 'rxjs';
import { Logger } from '@orxe-sdk/logging';

describe('Validation service', () => {
    let service;
    let cart: Cart;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CoreModule],
            providers: [
                {
                    provide: Cart,
                    useValue: {
                        securityOperations: {
                            ofacCheck: jest.fn().mockReturnValue('test'),
                        },
                    },
                },
            ],
        });
        service = TestBed.inject(ValidationService);
        cart = TestBed.inject(Cart);
        Logger.init = jest.fn().mockImplementation(() => { });
        Logger.logTrace = jest.fn();
    });

    beforeEach(inject(
        [ValidationService, HttpTestingController],
        (serviceInstance, httpMockInstance) => {
            service = serviceInstance;
            httpMock = httpMockInstance;
        }
    ));

    it('should be created security service instance', () => {
        expect(service).toBeTruthy();
    });

    it('should be called ofacCheck from securityOperations when checkOFAC method invoked', () => {
        const spy = jest.spyOn(cart.securityOperations, 'ofacCheck');
        service.checkOFAC(['test']);
        expect(spy).toHaveBeenCalled();
    });

    it('should test validate bin method', inject(
        [HttpTestingController, ValidationService],
        (httpMock: HttpTestingController, validationService: ValidationService) => {
            HttpMocker.mock('GET', 'test');
            validationService
                .validateBin({ cardNumber: '4111', isAgent: false })
                .subscribe((response: any) => {
                    expect(response).toEqual('test');
                });
        }
    ));

    test('should test validateBin method is called and received mock response ', () => {
        const resp = `<ValidationRS xmlns="ORXCore.WebServicesAPI" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
    <Code>3</Code>
    <status>200</status>
    <Message i:nil="true"/>
    <Success>false</Success>
</ValidationRS>`;
        HttpMocker.mock('GET', resp);
        const service = TestBed.inject(ValidationService);
        service
            .validateBin({ cardNumber: '4111', isAgent: false })
            .subscribe((response: any) => {
                expect(response).toEqual(resp);
            });
    });

    test('should throw error if response is not received calling validateBin method', async () => {
        HttpMocker.mock('GET', null);
        const service = TestBed.inject(ValidationService);
        service.validateBin({ cardNumber: '4111', isAgent: false }).subscribe(
            (response: any) => {
                expect(response).toEqual(null);
            },
            (error) => throwError(error)
        );
    });

    test('should return formatted response object after calling validateBinResponse method ', async () => {
        const expectedSuccessResp = {
            isValidBin: false,
            errorCode: '',
            message: 'Bin validation was successful',
        };
        let xmlSuccessBody = `<ValidationRS xmlns="ORXCore.WebServicesAPI" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
    <Code>3</Code>
    <status>200</status>
    <Message i:nil="true"/>
    <Success>false</Success>
</ValidationRS>`;

        const binRespObj = ValidationService.validateBinResponse(xmlSuccessBody);
        expect(binRespObj).toBeDefined();
        expect(binRespObj).toEqual(expectedSuccessResp);
        const expectedErrorResp = {
            isValidBin: false,
            errorCode: 'NoSuchKey',
            message: 'The specified key does not exist.',
        };
        const xmlErrorBody = `<?xml version="1.0" encoding="UTF-8"?>
    <Error><Code>NoSuchKey</Code><Message>The specified key does not exist.</Message><Key>mock/PurchaseBinValidations/411111/false</Key><RequestId>D2BAD33788AC6FE1</RequestId><HostId>sFXwroM/Y/paJqvbRuYe7bkWwJrgiHhx9SQ/gnvmfhOte246HcN4jhcnWxdz6bN+8Y0z3ES4k9U=</HostId></Error>`;
        const binErrorRespObj = ValidationService.validateBinResponse(xmlErrorBody);
        expect(binErrorRespObj).toEqual(expectedErrorResp);
    });
});