# orxe-payment-summary

An orxe-payment-summary will be checkout specific component and will be used to display product payable amount with total and promocode section

## Usage

### Angular / javascript

```html
<orxe-payment-summary [cartDetail]="cartDetails"></orxe-payment-summary>
```

```ts
cartDetail: any = {
  items: [
    // product details
  ],
  productsList: [
    // Main product details
  ],
  addOnProductsList: [
    // Add on product details
  ]
  price: {},
};

userProfile: any = {
  programCurrency: {
    value: // number
  }
}
```

## Properties

| Property      | Attribute     | Description                                     | Type      | Default  |
| ------------- | ------------- | ----------------------------------------------- | --------- | -------- |
| `cartDetail`  | `cartDetail`  | Used to set payment summary details, items wise | `any`     | ``       |
| `flow`        | `flow`        | Used to set CLP or Non CLP flow                 | `string`  | `NonCLP` |
| `userProfile` | `userProfile` | Used to set user detail information             | `any`     | ``       |
| `readOnly`    | `readOnly`    | Used to set mode of readonly or edit            | `boolean` | `true`   |

## Events

| Event                             | Description                                          | Event Data | Return   |
| --------------------------------- | ---------------------------------------------------- | ---------- | -------- |
| `onClickPaymentSummaryLinksEvent` | Emitted when payment summary components link clicked | `event`    | `LinkId` |

## Events Return LinkID Types

| LinkID Type               | Description                         |
| ------------------------- | ----------------------------------- |
| `add-a-promo-code`        | On click of Add a promo code        |
| `edit-payment`            | On click of Edit payment            |
| `want-to-use-less-points` | On click of Want to use less points |
