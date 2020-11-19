import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimelineItemComponent } from './timeline-item.component';
describe('TimelineItemComponent', () => {
  let component: TimelineItemComponent;
  let fixture: ComponentFixture<TimelineItemComponent>;
  let timeline_item;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check orxe-icon property', async () => {
    const loadedIcon = getByTestTagName('orxe-icon');
    loadedIcon.setAttribute('icon', 'ic-check');
    expect(loadedIcon.getAttribute('icon')).toEqual('ic-check');
  });

  it('should set the complete step on the timeline', async () => {
    const step = getByTestTagName('.timeline-circle');
    expect(step.getAttribute('step')).toEqual(null);
  });

  it('should set the primary color on the timeline title', () => {
    component.titleColor = 'primary';
    component.isTitleColorAvailable = true;
    expect(component.isTitleColorAvailable).toBe(true);
    expect(component.titleColor).toEqual('primary');
  });

  it('should set default property color on the timeline title', () => {
    component.titleColor = 'green';
    component.isTitleColorAvailable = undefined;
    expect(component.isTitleColorAvailable).toBe(undefined);
  });

  /**
   * Function that returns an element containing the matching tag element
   */
  function getByTestTagName(tagName: string): HTMLElement {
    return document.querySelector(`${tagName}`);
  }

  async function setProperty(property: string, value: any): Promise<void> {
    timeline_item[property] = value;
    await timeline_item.requestUpdate();
  }
});
