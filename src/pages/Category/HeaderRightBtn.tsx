import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({category}: RootState) => {
  return {
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface HeaderRightBtnProps extends ModelState {
  onSubmit: () => void;
}

class HeaderRightBtn extends React.Component<HeaderRightBtnProps> {
  render() {
    const {onSubmit, isEdit} = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? 'Complete' : 'Edit'} onPress={onSubmit} />
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightBtn);
