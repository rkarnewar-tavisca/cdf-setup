# checkout-timeline

The progress timeline component shows the total number of steps involved in order to complete the booking process. The step which is completed indicates a tickmark to convey the status of completion.

## Usage

A vertical timeline contains n number of steps

### Angular / javascript

```html
<!-- Colors -->
primary | secondary | tertiary | error | neutral
<timeline-item icon="ic-check" title="Booking Progress" titleColor="primary"> </timeline-item>
<!-- timeline -->
<timeline>
  <timeline-item icon="ic-check" title="Booking Progress" titleColor="primary">
    <p class="content">
      <b>Order ID:</b>
      <span>23343</span><br />
      <span class="label">Confirmed </span>23 April 2020
    </p>
  </timeline-item>
  <timeline-item step="active" title="Booking Received" titleColor="black"> </timeline-item>
</timeline>
<!-- active step -->
<timeline-item step="active" title="Booking Received" titleColor="black"> </timeline-item>
```

## Properties

| Property     | Attribute    | Description                     | Type     | Default   |
| ------------ | ------------ | ------------------------------- | -------- | --------- |
| `icon`       | `icon`       | Used to set icon for timeline.  | `string` | ``        |
| `title`      | `title`      | Used to set title for timeline. | `string` | ``        |
| `titleColor` | `titleColor` | Used to set color for title.    | `string` | `primary` |
