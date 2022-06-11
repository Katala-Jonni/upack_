import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Divider, Input, Typography } from '@mui/material';
import { Search as SearchIcon } from '../../../icons/search';
import { MultiSelect } from '../../multi-select';
import { RadioSelect } from '../../radio-select';

const statusOptions = [
  {
    label: 'Активна',
    value: 'active'
  },
  {
    label: 'Неактивна',
    value: 'locked'
  }
];

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies);
};

export const CategoryListFilters = (props) => {
  const { onChange, ...other } = props;
  const [queryValue, setQueryValue] = useState('');
  const [filterItems, setFilterItems] = useState([]);

  useUpdateEffect(() => {
      const filters = {
        name: undefined,
        status: null
      };

      // Transform the filter items in an object that can be used by the parent component to call the
      // serve with the updated filters
      filterItems.forEach((filterItem) => {
        switch(filterItem.field) {
          case 'name':
            // There will (or should) be only one filter item with field "name"
            // so we can setup it directly
            filters.name = filterItem.value;
            break;
          case 'status':
            filters.status = filterItem.value;
            break;
          default:
            break;
        }
      });

      onChange?.(filters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterItems]);

  const handleDelete = (filterItem) => {
    setFilterItems((prevState) => prevState.filter((_filterItem) => {
      return !(filterItem.field === _filterItem.field && filterItem.value === _filterItem.value);
    }));
  };

  const handleQueryChange = (event) => {
    setQueryValue(event.target.value);
  };

  const handleQueryKeyup = (event) => {
    if (event.code === 'Enter' && queryValue) {
      // We only allow one chip for the name field

      const filterItem = filterItems.find((filterItem) => filterItem.field === 'name');

      if (filterItem) {
        setFilterItems((prevState => prevState.map((filterItem) => {
          if (filterItem.field === 'name') {
            return {
              ...filterItem,
              value: queryValue
            };
          }

          return filterItem;
        })));
      } else {
        setFilterItems((prevState) => [
          ...prevState,
          {
            label: 'Наименование',
            field: 'name',
            value: queryValue
          }
        ]);
      }

      setQueryValue('');
    }
  };

  const handleStatusChange = (values) => {
    setFilterItems((prevState) => {
      const valuesFound = [];
      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => {
        if (filterItem.field !== 'status') {
          return true;
        }
        const found = values[0] === filterItem.value;
        if (found) {
          valuesFound.push(filterItem.value);
        }

        return found;
      });
      // Nothing changed
      if (values.length === valuesFound.length) {
        return newFilterItems;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = statusOptions.find((option) => option.value === value);

          newFilterItems.push({
            label: 'Статус',
            field: 'status',
            value,
            displayValue: option.label
          });
        }
      });

      return newFilterItems;
    });
  };

  // We memoize this part to prevent re-render issues
  const statusValues = useMemo(() => filterItems
    .filter((filterItems) => filterItems.field === 'status')
    .map((filterItems) => filterItems.value), [filterItems]);

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2
        }}
      >
        <SearchIcon fontSize="small"/>
        <Box
          sx={{
            flexGrow: 1,
            ml: 3
          }}
        >
          <Input
            disableUnderline
            fullWidth
            onChange={handleQueryChange}
            onKeyUp={handleQueryKeyup}
            placeholder="Поиск по наименованию категории"
            value={queryValue}
          />
        </Box>
      </Box>
      <Divider/>
      {filterItems.length > 0
        ? (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              p: 2
            }}
          >
            {filterItems.map((filterItem, i) => (
              <Chip
                key={i}
                label={(
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      '& span': {
                        fontWeight: 600
                      }
                    }}
                  >
                  <span>
                    {filterItem.label}
                  </span>
                    :
                    {' '}
                    {filterItem.displayValue || filterItem.value}
                  </Box>
                )}
                onDelete={() => handleDelete(filterItem)}
                sx={{ m: 1 }}
                variant="outlined"
              />
            ))}
          </Box>
        )
        : (
          <Box sx={{ p: 3 }}>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              Фильтры не применяются
            </Typography>
          </Box>
        )}
      <Divider/>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          p: 1
        }}
      >
        <RadioSelect
          label="Статус"
          onChange={(value) => handleStatusChange(value)}
          options={statusOptions}
          value={statusValues}
        />
      </Box>
    </div>
  );
};

CategoryListFilters.propTypes = {
  onChange: PropTypes.func
};
