import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  MultiSelect,
  Pagination,
  SegmentedControl,
  Select,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';

import { IFile, getFileIcon, getFileSizeString } from 'modules/files';
import React, { useMemo, useState } from 'react';
import {
  IconArrowRight,
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconFile,
  IconFilter,
  IconSearch
} from '@tabler/icons';
import { createStyles } from '@mantine/core';
import { useDebouncedValue, usePagination } from '@mantine/hooks';
import { useEffect } from 'react';
import { TableSection } from './table-section';
import { HeaderSection } from './header-section';
import { VisiblityFilter } from './filters-section/file-visibility-filter.component';
import { FiltersSection } from './filters-section';
import { PaginationSection } from './pagination-section';

const useStyles = createStyles((theme) => {
  return {
    container: {
      border: `1px solid ${theme.colors.gray[3]}`,
      borderRadius: theme.radius.lg
    },
    section: {
      padding: `0 ${theme.spacing.lg}px`,
      borderBottom: `1px solid ${theme.colors.gray[3]}`
    }
  };
});

type Props = {
  files: IFile[];
};

type FileFilters = {
  visiblity: VisiblityFilter;
  skip: number;
  take: number;
};

function filterFiles(
  files: IFile[],
  search: string,
  filters: FileFilters,
  searchKeys: Array<keyof IFile> = ['filename']
) {
  const query = search.toLowerCase().trim();
  const filteredFiles = files.filter((file) => {
    const isQueryMatch = searchKeys.some((key) =>
      String(file[key])?.toLowerCase().trim().includes(query)
    );

    // const isVisibilityMatch =
    //   filters.visiblity === 'all'
    //     ? true
    //     : file.visibility === filters.visiblity;
    const isVisibilityMatch = true;

    return isQueryMatch && isVisibilityMatch;
  });

  return filteredFiles.slice(filters.skip, filters.skip + filters.take);
}

export const FilesDataInterface = (props: Props) => {
  const { files } = props;

  const theme = useMantineTheme();
  const { classes } = useStyles();

  /**
   * Pagination
   */
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(props.files.length / itemsPerPage);
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1
  });

  /**
   * Search
   */
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const handleSearchChange = (search: string) => setSearch(search);

  /**
   * Filters
   */
  const [visibilityFilter, setVisibilityFilter] =
    useState<VisiblityFilter>('all');
  const handleVisibilityFilterChange = (value: VisiblityFilter) =>
    setVisibilityFilter(value);

  /**
   * Table Logic
   */
  const filteredFiles = useMemo(
    () =>
      filterFiles(files, debouncedSearch, {
        visiblity: visibilityFilter,
        skip: (pagination.active - 1) * itemsPerPage,
        take: itemsPerPage
      }),
    [files, debouncedSearch, visibilityFilter, pagination.active, itemsPerPage]
  );
  const [selected, setSelected] = useState<IFile[]>([]);
  const handleSelectedChange = (value: number[]) => {
    const selectedFiles = files.filter((file) => value.includes(file.id));
    setSelected(selectedFiles);
  };

  return (
    <div>
      <div className={classes.container}>
        <HeaderSection />
        <FiltersSection
          selected={selected}
          onSearchChange={handleSearchChange}
          onVisibilityChange={handleVisibilityFilterChange}
        />
        <TableSection files={filteredFiles} onChange={handleSelectedChange} />
      </div>
      <PaginationSection
        pagination={pagination}
        totalPages={totalPages}
        files={files}
      />
    </div>
  );
};
