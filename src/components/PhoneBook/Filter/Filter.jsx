import Box from 'components/Box/Box';

export const Filter = ({ value, onChange }) => {
  const filter = (
    <Box>
      <p>Find contacts by name</p>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </Box>
  );
  return filter;
};
