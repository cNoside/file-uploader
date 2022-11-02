import { IFile, getFileIcon, getFileSizeString } from 'modules/files';
import {
  Checkbox,
  Group,
  Text,
  Table,
  Badge,
  TextInput,
  ActionIcon
} from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { FileNameInput } from './name-input.component';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons';
import { TableRow } from './table-row';
import { MantineTheme, useMantineTheme } from '@mantine/core';

type Props = {
  files: IFile[];
  onChange: (selected: number[]) => void;
};

export const TableSection = (props: Props) => {
  const { files, onChange } = props;

  const theme = useMantineTheme();

  const [selected, setSelected] = useState<number[]>([]);
  const toggleOne = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  const toggleAll = () =>
    setSelected((prev) =>
      prev.length > 0 ? [] : files.map((file) => file.id)
    );

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const rows = files.map((file, i) => {
    return (
      <TableRow
        key={`file-${i}`}
        file={file}
        isSelected={selected.includes(file.id)}
        onChange={toggleOne}
      />
    );
  });

  const headers = (
    <tr
      style={{
        backgroundColor: theme.colors.gray[2]
      }}
    >
      <th>
        <Checkbox
          onChange={toggleAll}
          checked={selected.length === files.length}
          indeterminate={selected.length > 0 && selected.length < files.length}
        />
      </th>
      <th>File name</th>
      <th>File sizes</th>
      <th></th>
    </tr>
  );

  return (
    <section>
      <Table
        fontSize="md"
        verticalSpacing="sm"
        horizontalSpacing="lg"
        highlightOnHover
      >
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </section>
  );
};
