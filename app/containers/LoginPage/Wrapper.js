import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const Wrapper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 480px;
  padding: 8px;
`;

export default Wrapper;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
`;
