import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { BlueLoading, BlueText, SafeBlueArea, BlueListItem, BlueCard, BlueNavigationStyle } from '../../BlueComponents';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
let loc = require('../../loc');

export default class Electrum extends Component {
  static navigationOptions = () => ({
    ...BlueNavigationStyle(),
    title: 'Electrum',
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
  }
}

  async componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('setLanguage', item.value);
          loc.setLanguage(item.value);
          loc.saveLanguage(item.value);
          return this.setState({ language: item.value });
        }}
      >
        <BlueListItem
          title={item.label}
          {...(this.state.language === item.value
            ? {
                rightIcon: <Icon name="check" type="font-awesome" color="#0c2550" />,
              }
            : { hideChevron: true })}
        />
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <BlueLoading />;
    }

    return (
      <SafeBlueArea forceInset={{ horizontal: 'always' }} style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(_item, index) => `${index}`}
          data={this.state.availableLanguages}
          extraData={this.state.availableLanguages}
          renderItem={this.renderItem}
        />
        <BlueCard>
          <BlueText>When selecting a new language, restarting BlueWallet may be required for the change to take effect.</BlueText>
        </BlueCard>
      </SafeBlueArea>
    );
  }
}

Electrum.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
};