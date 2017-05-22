import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Avatar from 'react-md/lib/Avatars';

const CardWrapper = styled(Card)`
  margin-bottom: 8px;
  width: 100%;
`;

class MomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { moment } = this.props;

    return (
      <CardWrapper className="md-block-centered">
        <CardTitle
          avatar={<Avatar src={moment.avatar} role="presentation" />}
          title={moment.nickname}
        />
      </CardWrapper>
    );
  }
}

MomentCard.propTypes = {
  moment: PropTypes.object,
};

export default MomentCard;
