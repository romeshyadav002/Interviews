import { useEffect, useState } from 'react';

export const List = ({
  list,
  addNodeToList,
  expandedNodes,
  toggleNodeExpansion,
  deleteNodeFromList,
  updateName,
  focusedIndex,
  setFocusedIndex,
  parentPath = [],
}: {
  list: any[];
  addNodeToList: (parentId: any, isFolder: boolean) => void;
  expandedNodes: Record<number, boolean>;
  toggleNodeExpansion: (id: number) => void;
  deleteNodeFromList: (parentId: any) => void;
  updateName: (id: any) => void;
  focusedIndex: number | null;
  setFocusedIndex: (id: number) => void;
  parentPath?: { node: any; list: any[] }[];
}) => {
  const handleKeyDown = (
    e: React.KeyboardEvent,
    node: any,
    siblingList: any[],
    parentPath: { node: any; list: any[] }[],
  ) => {
    const index = siblingList.findIndex((n: any) => n.id === node.id);

    const getNextNode = (): number | null => {
      if (
        node.isFolder &&
        expandedNodes[node.id] &&
        node.children?.length > 0
      ) {
        return node.children[0].id;
      }
      if (index < siblingList.length - 1) {
        return siblingList[index + 1].id;
      }
      for (let i = parentPath.length - 1; i >= 0; i--) {
        const parent = parentPath[i].node;
        const siblings = parentPath[i].list;
        const parentIndex = siblings.findIndex((n: any) => n.id === parent.id);
        if (parentIndex < siblings.length - 1) {
          return siblings[parentIndex + 1].id;
        }
      }
      return null;
    };

    const getPrevNode = (): number | null => {
      if (index > 0) {
        let prev = siblingList[index - 1];
        while (
          prev.isFolder &&
          expandedNodes[prev.id] &&
          prev.children?.length > 0
        ) {
          prev = prev.children[prev.children.length - 1];
        }
        return prev.id;
      }
      if (parentPath.length > 0) {
        return parentPath[parentPath.length - 1].node.id;
      }
      return null;
    };

    switch (e.key) {
      case 'ArrowDown': {
        const nextId = getNextNode();
        if (nextId !== null) setFocusedIndex(nextId);
        break;
      }
      case 'ArrowUp': {
        const prevId = getPrevNode();
        if (prevId !== null) setFocusedIndex(prevId);
        break;
      }
      case 'Enter':
        if (node.isFolder) toggleNodeExpansion(node.id);
        break;
      case 'Delete':
        deleteNodeFromList(node.id);
        break;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (focusedIndex !== null) {
      const el = document.getElementById(`node-${focusedIndex}`);
      el?.focus();
    }
  }, [focusedIndex]);

  return (
    <>
      {list &&
        list.length > 0 &&
        list.map((node: any) => {
          const isFocused = node.id === focusedIndex;
          const [isDialogOpen, setIsDialogOpen] = useState(false);

          return (
            <div key={node.id} className="flex flex-col items-start">
              <div
                id={`node-${node.id}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, node, list, parentPath)}
                onClick={() => setFocusedIndex(node.id)}
                className="flex flex-row outline-none px-1 py-1 w-fit"
                // style={{
                //   backgroundColor: isFocused ? 'blue' : undefined,
                // }}
              >
                {node.isFolder && (
                  <div
                    onClick={() => toggleNodeExpansion(node.id)}
                    className="cursor-pointer pr-1"
                  >
                    {expandedNodes[node.id] ? '⬆️' : '⬇️'}
                  </div>
                )}
                <h4>{node.name}</h4>
                {node.isFolder && (
                  <>
                    <div
                      className="pl-2 cursor-pointer"
                      onClick={() => addNodeToList(node.id, false)}
                    >
                      📁 Add File
                    </div>
                    <div
                      className="pl-2 cursor-pointer"
                      onClick={() => addNodeToList(node.id, true)}
                    >
                      🗂️ Add Folder
                    </div>
                  </>
                )}
                <div
                  className="pl-2 cursor-pointer"
                  onClick={() => deleteNodeFromList(node.id)}
                >
                  🗑️ Delete
                </div>
              </div>
              {node.isFolder && node.children && expandedNodes[node.id] && (
                <div className="pl-4">
                  <List
                    list={node.children}
                    addNodeToList={addNodeToList}
                    expandedNodes={expandedNodes}
                    toggleNodeExpansion={toggleNodeExpansion}
                    deleteNodeFromList={deleteNodeFromList}
                    updateName={updateName}
                    focusedIndex={focusedIndex}
                    setFocusedIndex={setFocusedIndex}
                    parentPath={[...parentPath, { node, list }]}
                  />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};
