/*
 * Copyright  2018 Linkel Technology Co., Ltd, Beijing
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BA SIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin/lib';

import { KeypairList, KeypairShow, KeypairEdit, KeypairCreate } from './components/keypair';
import { TransList, TransShow, TransCreate } from './components/transaction';
import { NetworkList, NetworkShow, NetworkEdit, NetworkCreate } from './components/network';
import { NodeList, NodeEdit, NodeShow, NodeCreate } from './components/netpeer';
import { BlockList, BlockShow } from './components/block';
import { FileList, FileCreate, FileShow } from './components/file';

import KeypairIcon from '@material-ui/icons/VpnKey';
import TransIcon from '@material-ui/icons/Cached';
import NetworkIcon from '@material-ui/icons/GroupWork';
import NodeIcon from '@material-ui/icons/Computer';
import BlockIcon from '@material-ui/icons/ViewColumn';
import AttachIcon from '@material-ui/icons/AttachFile';
import Dashboard from './components/dashboard/Dashboard';

import authProvider from './authProvider';
import englishMessages from './i18n/cn';
import chineseMessages from './i18n/cn';

//import  dataProvider from './dataprovider/data-provider'
import buildGraphQLProvider from './adaptator';
import indexDataProvider from './dataprovider/ra-data-indexdb'
import addUploadCapabilities from './dataprovider/addUploadFeature';
import createRealtimeSaga from "./createRealtimeSaga";
import settings from  './settings';

const messages = {
    cn: chineseMessages,
    en: englishMessages,
}
const i18nProvider = locale => messages[locale];



class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildGraphQLProvider({
            clientOptions: { uri: settings.Prisma.endpoint }
        }).then(dataProvider => {
            const upDataProvider = addUploadCapabilities(dataProvider)
            const realTimeSaga = createRealtimeSaga(upDataProvider);
            this.setState({
                customSagas: realTimeSaga,
                dataProvider: (type, resource, params) => {
                    if (resource === 'keypairs')
                        return addUploadCapabilities(indexDataProvider)(type, resource, params);
                    else
                        return upDataProvider(type, resource, params);
                }
            }
            )
        }
        );
    }

    render() {
        const { dataProvider, customSagas,title } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider}
                title = {title}
                authProvider={authProvider}
                customSagas={[customSagas]}
                locale="cn" 
                i18nProvider={i18nProvider} 
                dashboard={Dashboard} >
                <Resource name="keypairs" list={KeypairList} show={KeypairShow} edit={KeypairEdit} create={KeypairCreate} icon={KeypairIcon} />
                <Resource name="Network" list={NetworkList} edit={NetworkEdit} show={NetworkShow} create={NetworkCreate} icon={NetworkIcon} />
                <Resource name="NetPeer" list={NodeList} edit={NodeEdit} show={NodeShow} create={NodeCreate} icon={NodeIcon} />
                <Resource name="Block" list={BlockList} show={BlockShow} icon={BlockIcon} />
                <Resource name="Transaction" list={TransList} show={TransShow} create={TransCreate} icon={TransIcon} />
                <Resource name="File" list={FileList} show={FileShow} create={FileCreate} icon={AttachIcon} />
            </Admin>
        );
    }
}
export default App;