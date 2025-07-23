export  const findPathById = (
    list: any[],
    id: number,
    path: String[],
  ): string[] | null => {
    for (const node of list) {
      const newPath = [...path, node.name];
      if (node.id === id) return newPath;
      if (node.children) {
        const result = findPathById(node.children, id, newPath);
        if (result) return result;
      }
    }
    return null;
  };