'use strict';

const produce = (config, override) => Object.assign({}, config, override);

exports.decorateConfig = config => {
  let {
    controls,
    side = 'left',
    circleSize = 11,
    circleGap = 16,
    distanceToSide = 15,
    opacity = 1,
    hoverOpacity = 0.5,
  } = config.hyperCustomControls || {};

  const defaultControls = [
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
  ];

  if (!controls) {
    controls = defaultControls;
  } else {
    defaultControls.forEach(control => {
      if (!controls.find(item => item.type === control.type)) {
        controls.push({ ...control, hidden: true });
      }
    });
  }

  const parsedControls = controls
    .map((control, index) => {
      let nthChild;
      switch (control.type) {
        case 'close': {
          nthChild = 3;
          break;
        }
        case 'minimize': {
          nthChild = 1;
          break;
        }
        case 'maximize': {
          nthChild = 2;
          break;
        }
        default:
          return null;
      }

      const order = index + 1;

      return {
        nthChild,
        order,
        color: control.color,
        visible: !control.hidden,
      };
    })
    .filter(control => control !== null);

  const visibleControlsAmount = parsedControls.filter(
    control => control.visible
  ).length;
  const windowControlsWidth =
    visibleControlsAmount * circleSize +
    (visibleControlsAmount - 1) * circleGap;

  return produce(config, {
    css: `
      ${config.css || ''}
      .header_hamburgerMenuLeft {
        top: 0px;
        right: ${side === 'left' ? '0px' : 'auto'};
        left: ${side === 'left' ? 'auto' : '0px'};
      }

      .header_windowControls {
        display: flex;
        flex-shrink: 1;

        top: 0px;
        left: ${side === 'left' ? `${distanceToSide}px` : 'auto'};
        right: ${side === 'left' ? 'auto' : `${distanceToSide}px`};

        max-width: ${windowControlsWidth}px;
      }

      .header_windowControls div {
        display: flex;
        align-items: center;
      }
      
      .header_windowControls div svg {
        width: ${circleSize}px;
        height: ${circleSize}px;
        padding: 0;
        border-radius: 50%;

        opacity: ${opacity};
      }

      .header_windowControls div svg:hover {
        opacity: ${hoverOpacity};
      }

      .header_windowControls div svg use {
        display: none;
      }

      ${parsedControls.map(control => {
        const { nthChild, order, color, visible } = control;

        return `
          .header_windowControls div:nth-child(${nthChild}) {
            order: ${order};
            ${visible ? '' : 'position: absolute;'}
          }
          .header_windowControls div:nth-child(${nthChild}) svg {
            background-color: ${color};
            ${visible ? '' : 'display: none;'}
          }
        `;
      })}
    `,
  });
};
