import React, { useState } from 'react';
import { DiffNode, SchemaNode } from '@/utils/types';
import { cn } from '@/lib/utils';
import { MinusCircle, PlusCircle, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SchemaNodeProps {
  node: DiffNode | SchemaNode;
  isDiffNode?: boolean;
  diffContext?: 'old' | 'new' | 'merged'; // Indicates if rendering old, new, or a merged diff structure
  defaultOpen?: boolean;
}

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'object':
      return 'text-purple-400';
    case 'array':
      return 'text-cyan-400';
    case 'string':
      return 'text-green-400';
    case 'number':
      return 'text-orange-400';
    case 'boolean':
      return 'text-pink-400';
    case 'null':
      return 'text-gray-400';
    default:
      return 'text-zinc-400';
  }
};

const SchemaNodeViewer: React.FC<SchemaNodeProps> = ({ node, isDiffNode = false, diffContext = 'merged', defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = (node: DiffNode | SchemaNode) => {
    if (isDiffNode) {
      const diffNode = node as DiffNode;
      return !!diffNode.children && diffNode.children.length > 0;
    } else {
      const schemaNode = node as SchemaNode;
      return (schemaNode.type === 'object' && schemaNode.properties && Object.keys(schemaNode.properties).length > 0) ||
             (schemaNode.type === 'array' && schemaNode.items && (schemaNode.items.type === 'object' || schemaNode.items.type === 'array'));
    }
  };

  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) return `[Array, length: ${value.length}]`;
      return '{Object}';
    }
    return JSON.stringify(value);
  };

  const getColorClass = (type: DiffNode['type']) => {
    switch (type) {
      case 'added':
        return 'text-green-400 bg-green-950/20';
      case 'removed':
        return 'text-red-400 bg-red-950/20';
      case 'changed':
        return 'text-yellow-400 bg-yellow-950/20';
      case 'unchanged':
        return 'text-zinc-300';
      default:
        return 'text-zinc-300';
    }
  };

  const getIcon = (type: DiffNode['type']) => {
    switch (type) {
      case 'added':
        return <PlusCircle className="h-4 w-4 text-green-500 mr-2" />;
      case 'removed':
        return <MinusCircle className="h-4 w-4 text-red-500 mr-2" />;
      case 'changed':
        return <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />;
      default:
        return null;
    }
  };

  if (isDiffNode) {
    const diffNode = node as DiffNode;
    const keyDisplay = diffNode.key ? `${diffNode.key}: ` : '';
    const oldSchema = diffNode.oldValue as SchemaNode | undefined;
    const newSchema = diffNode.newValue as SchemaNode | undefined;

    const renderTypeChange = () => {
      if (oldSchema?.type && newSchema?.type && oldSchema.type !== newSchema.type) {
        return (
          <span className="text-yellow-400">
            {oldSchema.type}
            <span className="text-zinc-500"> → </span>
            {newSchema.type}
          </span>
        );
      }
      return null;
    };

    return (
      <div className={cn('px-2 py-1 rounded', getColorClass(diffNode.type))}>
        <div className="flex items-center">
          {getIcon(diffNode.type)}
          <span>{keyDisplay}</span>
          {renderTypeChange()}
        </div>
      </div>
    );
  }

  return null;
};

export default SchemaNodeViewer;