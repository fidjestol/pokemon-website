import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleColumn } from '../redux/pokemonSlice';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

interface RootState {
  pokemon: {
    columns: {
      picture: boolean;
      weight: boolean;
      height: boolean;
      types: boolean;
    };
  };
}

const ColumnToggler: React.FC = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.pokemon.columns);

  const columnKeys = Object.keys(columns) as Array<keyof typeof columns>;

  const handleToggle = (column: keyof typeof columns) => {
    dispatch(toggleColumn(column));
  };

  return (
      <FormGroup row> {/* Add row prop to display checkboxes horizontally */}
        {columnKeys.map((column) => (
            <FormControlLabel
                key={column}
                control={
                  <Checkbox
                      checked={columns[column]}
                      onChange={() => handleToggle(column)}
                  />
                }
                label={column.charAt(0).toUpperCase() + column.slice(1)}
            />
        ))}
      </FormGroup>
  );
};

export default ColumnToggler;
