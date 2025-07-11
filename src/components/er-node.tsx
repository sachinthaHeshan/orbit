import React from "react";
import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaNodeBody,
  DatabaseSchemaTableRow,
  DatabaseSchemaTableCell,
} from "@/components/database-schema-node";
import { EntityFields, ERTemplate } from "@/types/er-diagram";
import { parseFieldDefinition } from "@/utils/field-parser";

interface ERNodeProps {
  data: { name: string; fields: EntityFields; template?: ERTemplate };
  selected?: boolean;
}

export const ERNode: React.FC<ERNodeProps> = ({ data, selected }) => {
  const fieldEntries = Object.entries(data.fields);

  return (
    <DatabaseSchemaNode
      className={`min-w-[250px] transition-all duration-200 ${
        selected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
      }`}
    >
      <DatabaseSchemaNodeHeader>
        <div className="font-semibold text-foreground">{data.name}</div>
      </DatabaseSchemaNodeHeader>
      <DatabaseSchemaNodeBody>
        {fieldEntries.map(([fieldName, fieldDefinition], index) => {
          const parsedField = parseFieldDefinition(
            fieldDefinition,
            data.template,
            data.name,
            fieldName
          );
          return (
            <DatabaseSchemaTableRow
              key={index}
              entityName={data.name}
              attributeName={fieldName}
              isPrimaryKey={parsedField.primaryKey}
              isForeignKey={parsedField.foreignKey}
            >
              <DatabaseSchemaTableCell className="font-medium">
                {fieldName}
              </DatabaseSchemaTableCell>
              <DatabaseSchemaTableCell className="text-muted-foreground">
                {parsedField.type}
              </DatabaseSchemaTableCell>
              <DatabaseSchemaTableCell className="text-xs">
                {parsedField.primaryKey && (
                  <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs mr-1">
                    PK
                  </span>
                )}
                {parsedField.foreignKey && (
                  <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs mr-1">
                    FK
                  </span>
                )}
                {!parsedField.nullable && (
                  <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs mr-1">
                    NOT NULL
                  </span>
                )}
                {parsedField.unique && (
                  <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-xs">
                    UNIQUE
                  </span>
                )}
              </DatabaseSchemaTableCell>
            </DatabaseSchemaTableRow>
          );
        })}
      </DatabaseSchemaNodeBody>
    </DatabaseSchemaNode>
  );
};
