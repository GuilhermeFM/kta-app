import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';

import logoLight from '../../../../assets/logo-light.png';

import {
  Container,
  ContentScroll,
  SideMenuItemContainer,
  SideMenuSection,
} from './styles';

interface ISideMenuItem {
  description?: string;
  isSection?: boolean;
  selected?: boolean;
  expanded?: boolean;
  style?: object;
  depth?: number;
  icon?: string;
  url?: string;
  id: number;

  subItems?: ISideMenuItem[];
  onClick?(e: React.SyntheticEvent): void;
}

interface SideMenuProps {
  items: ISideMenuItem[];
}

const SideMenu: React.FC<SideMenuProps> = ({ items }) => {
  const { push } = useHistory();
  const menuItemRef = useRef<ISideMenuItem[]>([]);
  const [flattedMenuItem, setFlattedMenuItem] = useState<ISideMenuItem[]>([]);

  const transitions = useTransition(flattedMenuItem, {
    key: item => item.id,
    enter: item => async next => {
      await next({ height: item.isSection ? 20 : 48 });
      await next({ opacity: 1 });
    },
    leave: () => async next => {
      await next({ opacity: 0 });
      await next({ height: 0 });
    },

    from: { opacity: 0, height: 0 },
    config: { duration: 250 },
  });

  const flattenNodes = useCallback(
    (nodes: ISideMenuItem[], flatted: ISideMenuItem[] = []): void => {
      for (let idx = 0; idx < nodes.length; idx += 1) {
        const node = nodes[idx];

        flatted.push({
          ...node,
          onClick: e => {
            e.preventDefault();

            if (!node.subItems) {
              node.url && push(node.url);
            } else {
              node.expanded = !node.expanded;

              const flattedMenuItems: ISideMenuItem[] = [];
              flattenNodes(menuItemRef.current, flattedMenuItems);
              setFlattedMenuItem(flattedMenuItems);
            }
          },
        });

        if (!node.expanded) continue;
        if (node.subItems) flattenNodes(node.subItems, flatted);
      }
    },
    [],
  );

  useEffect(() => {
    menuItemRef.current = items;

    const flattedMenuItems: ISideMenuItem[] = [];
    flattenNodes(menuItemRef.current, flattedMenuItems);
    setFlattedMenuItem(flattedMenuItems);
  }, [flattenNodes, items]);

  return (
    <Container>
      <div id="side-menu-header">
        <img src={logoLight} alt="logo" />
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
              fill="#000000"
              fillRule="nonzero"
              transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)"
            />
            <path
              d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
              transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)"
            />
          </g>
        </svg>
      </div>
      <div id="side-menu-content">
        <ContentScroll>
          <ul>
            {transitions((style, item) => (
              <SideMenuItem {...item} style={style} />
            ))}
          </ul>
        </ContentScroll>
      </div>
    </Container>
  );
};

type SideMenuItemProps = ISideMenuItem;

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  description,
  isSection,
  selected,
  expanded,
  style,
  depth,
  icon,
  subItems,
  onClick,
}) => {
  const arrowSprings = useSpring({
    transform: `rotate(${expanded ? 90 : 0}deg)`,
    config: { duration: 200 },
  });

  return (
    <>
      {isSection ? (
        <SideMenuSection style={style}>
          <h4>{description}</h4>
        </SideMenuSection>
      ) : (
        <SideMenuItemContainer depth={depth} style={style} selected={selected}>
          <a href="/#" onClick={onClick}>
            {icon ? (
              <i id="left-icon" className={icon} />
            ) : (
              <i>
                <span />
              </i>
            )}
            <span>{description}</span>
            {!!subItems && (
              <animated.i
                id="right-icon"
                className="flaticon2-next"
                style={arrowSprings}
              />
            )}
          </a>
        </SideMenuItemContainer>
      )}
    </>
  );
};

export default SideMenu;
