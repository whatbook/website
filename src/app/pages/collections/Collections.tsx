import React, { Component } from 'react'
import { CollectionsWrap } from './styled';
import CollectionCard from '../../components/Card';

export default class Collections extends Component {
  render() {
    return (
      <div>
        <CollectionsWrap>
          {[1, 2, 3].map(() => {
            return <CollectionCard />
          })}
        </CollectionsWrap>

      </div>
    )
  }
}
