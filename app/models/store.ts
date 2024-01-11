// Store.js
import {Instance, types} from 'mobx-state-tree';
import CounterModel from './CounterModel';
import {createContext, useContext} from 'react';
import OrganizationModel from './OrganizationModel';
import AuthModel from './AuthModel';
import TopicModel from './TopicModel';
import MessageModel from './MessageModel';

const RootStoreModel = types.model('RootStore', {
  authModel: types.optional(AuthModel, {} as any),
  counterModel: types.optional(CounterModel, {count: 0}),
  organizationModel: types.optional(OrganizationModel, {} as any),
  topicModel: types.optional(TopicModel, {} as any),
  messageModel: types.optional(MessageModel, {} as any),
});

export const rootStore = RootStoreModel.create({});
export interface IRootStore extends Instance<typeof RootStoreModel> {}
export const RootStoreContext = createContext<IRootStore>({} as IRootStore);
export const useStores = () => useContext(RootStoreContext);
export default RootStoreModel;
