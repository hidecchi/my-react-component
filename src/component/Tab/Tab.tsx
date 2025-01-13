import clsx from "clsx";
import {
  type FC,
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import styles from "./Tab.module.scss";

type TabProps = {
  defaultLabel: string;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  className?: string;
};

type TabHeader = {
  label: string;
};

type TabContextState = {
  activeLabel: string;
};

const TabContext = createContext<TabContextState>({
  activeLabel: "",
});

export const Tab: FC<TabProps> = ({ defaultLabel, children, className }) => {
  const [activeLabel, setActiveLabel] = useState(defaultLabel);

  const headers = useMemo<TabHeader[]>(() => {
    const headerArray: TabHeader[] = [];
    if (Array.isArray(children)) {
      for (const child of children) {
        if (child.type !== TabItem)
          throw new Error("TabItemを利用してください");
        headerArray.push({
          label: child.props.label,
        });
      }
    } else if (children.type === TabItem) {
      headerArray.push({
        label: children.props.label,
      });
    } else {
      throw new Error("TabItemを利用してください");
    }
    return headerArray;
  }, [children]);

  return (
    <TabContext.Provider value={{ activeLabel }}>
      <div className={clsx(styles.header, className)} role="tablist">
        {headers.map(({ label }) => {
          return (
            <button
              className={clsx(
                styles.button,
                label === activeLabel && styles.active,
              )}
              onClick={() => setActiveLabel(label)}
              key={label}
              role="tab"
              aria-selected={label === activeLabel}
              aria-controls={`${label}パネル`}
              id={`${label}タブ`}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>
      {children}
    </TabContext.Provider>
  );
};

type TabItemProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export const TabItem: FC<TabItemProps> = ({ children, className, label }) => {
  const { activeLabel } = useContext(TabContext);

  return activeLabel === label ? (
    <div
      className={clsx(styles.tabBody, className)}
      role="tabpanel"
      id={`${label}パネル`}
      aria-labelledby={`${label}タブ`}
    >
      {children}
    </div>
  ) : null;
};
