const time = Variable("", {
  poll: [1000, ["date", "+%a %d %b %H:%M:%S"]]
});

const clock = () => Widget.Box({
  class_name: "clock-container",
  children: [
    Widget.Label({
      class_name: "clock-time",
      label: time.bind()
    }),
  ],
});

export default clock
