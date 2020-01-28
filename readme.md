# hyper-custom-controls

> Add Mac-like controls to Hyper Terminal, but highly customizable

![](https://raw.githubusercontent.com/guilhermerodz/hyper-custom-controls/master/media/result.png)

## Configuration

In your `~/.hyper.js`, you can configure settings for `hyper-custom-controls`.

```js
modules.exports = {
  config: {
    // NOTE: All properties below are optional and have a default value.
    hyperCustomControls: {
      side: 'left', // Default: 'left'
      circleSize: 11, // Default: 11
      circleGap: 7.5, // Default: 7.5
      distanceToSide: 15, // Default: 15
      opacity: 1, // Default: 1
      hoverOpacity: 0.5, // Default: 0.5

      // Default controls below:
      // NOTE: You can remove a control, if you want to.
      controls: [
        {
          type: 'close',
          color: '#F24F55',
        },
        {
          type: 'minimize',
          color: '#FBC536',
        },
        {
          type: 'maximize',
          color: '#39EA48',
        },
      ],
    },
  },
};
```
