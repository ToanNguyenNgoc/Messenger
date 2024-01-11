import axios from 'axios';
import {flow, types} from 'mobx-state-tree';

const OrganizationModel = types.model('Organization').actions(self => {
  const getOrganization = flow(function* getOrganization() {
    const response = yield axios.get(
      'https://api.myspa.vn/v1/organizations/demo',
    );
    return response;
  });
  return {
    getOrganization,
  };
});
export default OrganizationModel;
