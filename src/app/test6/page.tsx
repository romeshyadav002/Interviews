'use client';
import React, { useEffect, useRef, useState } from 'react';
import json from '../../constants/data.json';
import folder from '../../constants/folder.json';
import { List } from '../../components/List';
import { findPathById } from '@/helpers/utils';

const FileExplorer = () => {
  const [data, setData] = useState(json);
  const [folders, setFolders] = useState(folder);
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>(
    {},
  );
  const [breadCrumbString, setBreadCrumbString] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const toggleNodeExpansion = (id: number) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const addNodeToList = (parentId: any, isFolder: boolean) => {
    const name = prompt('Enter name');
    if (!name) return;
    const updateData = (list: any) => {
      return list.map((node: any) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now(),
                name,
                isFolder,
                children: isFolder ? [] : undefined,
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateData(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateData(prev));
  };
  const deleteNodeFromList = (parentId: any) => {
    const updateData = (list: any) => {
      return list
        .map((node: any) => {
          if (node.id === parentId) {
            return null;
          }
          if (node.children) {
            return { ...node, children: updateData(node.children) };
          }
          return node;
        })
        .filter(Boolean);
    };
    setData((prev) => updateData(prev));
  };
  const updateName = (parentId: any) => {
    const name = prompt('Enter name');
    if (!name) return;
    const updateData = (list: any) => {
      return list.map((node: any) => {
        if (node.id === parentId) {
          return {
            ...node,
            name: name,
          };
        }
        if (node.children) {
          return { ...node, children: updateData(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateData(prev));
  };

  useEffect(() => {
    if (focusedIndex === null) {
      setBreadCrumbString('');
      return;
    }
    const pathArray = findPathById(data, focusedIndex, []);
    if (pathArray) {
      setBreadCrumbString(pathArray.join(' / '));
    } else {
      setBreadCrumbString('');
    }
  }, [focusedIndex, data]);

  return (
    <div className="flex flex-col items-start justify-center pt-10 pl-5">
      <div className="font-bold text-4xl">FileExplorer</div>
      <div className="font-bold text-xl">{breadCrumbString}</div>
      <List
        list={data}
        addNodeToList={addNodeToList}
        expandedNodes={expandedNodes}
        toggleNodeExpansion={toggleNodeExpansion}
        deleteNodeFromList={deleteNodeFromList}
        updateName={updateName}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
      />
    </div>
  );
};

export default FileExplorer;
