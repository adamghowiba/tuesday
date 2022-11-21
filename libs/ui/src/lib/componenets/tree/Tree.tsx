import React, {
  createElement,
  FC,
  isValidElement,
  Key,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import Button, { ButtonProps } from '../button/Button';

export interface TreeNodeActionComponentParams {
  isOpen: boolean;
  title?: string;
}

export interface TreeNode {
  component?:
    | ReactElement
    | ((params: TreeNodeActionComponentParams) => ReactElement);
  title?: string;
  key: Key;
  isDropdownOpen?: boolean;
  children: ReactElement[] | TreeNode[];
}

export interface TreeProps {
  treeData: TreeNode[];
  indentationAmount?: number;
}

const Tree: FC<TreeProps> = ({ treeData, indentationAmount = 25 }) => {
  const [openDropdowns, setOpenDropdowns] = useState<Key[]>([]);

  const openDropdown = (key: Key) => {
    setOpenDropdowns((open) => {
      if (open.includes(key)) return open.filter((_key) => _key !== key);

      return [...open, key];
    });
  };

  const getActionNodeComponent = (node: TreeNode) => {
    if (node.component instanceof Function) {
      return node.component({
        isOpen: openDropdowns.includes(node.key),
        title: node.title,
      });
    }

    if (node?.component) return node.component;

    if (node.title) return <Button fullWidth> {node.title}</Button>;
  };

  return (
    <>
      <div className="tree">
        {treeData.map((node, i) => (
          <div className="node-wrapper">
            <div
              className="node"
              key={node.key}
              onClick={() => openDropdown(node.key)}
            >
              {getActionNodeComponent(node)}
              {/* {node?.component || <Button fullWidth> {node.title}</Button>} */}
            </div>

            {openDropdowns.includes(node.key) && (
              <div
                className="dropdown"
                style={{ marginLeft: `${i + 1 * indentationAmount}px` }}
              >
                {node.children?.map((child) => (
                  <div key={child.key}>
                    {isValidElement(child) ? (
                      child
                    ) : (
                      <Tree treeData={[child]} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/*  */}
          </div>
        ))}
      </div>
      <style jsx>{`
        .dropdown {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default Tree;
