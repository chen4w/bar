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
import React from 'react';
import {
    ShowButton, Show,TabbedShowLayout,Tab, ReferenceField,
    Filter, DateInput, BooleanField,
    UrlField, DateField,  Responsive, SimpleList, List, 
    RichTextField, Datagrid, TextField, TextInput
} from 'react-admin/lib';

const CertFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <DateInput source="created" />
    </Filter>
);

export const CertList = (props) => (
    <List {...props}
        filters={<CertFilter />}
        bulkActions={false}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.sn}
                    secondaryText={record => record.desc}
                    tertiaryText={record => new Date(record.created).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <UrlField source="sn_cert" title="下载证书" />
                    <ReferenceField label="姓名" source="aid" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                    <BooleanField source="status" />
                    <DateField source="created" showTime />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const CertTitle = ({ record }) => {
    return <span> {record ? `"${record.sn}"` : ''}</span>;
};

export const CertShow = (props) => (
    <Show title={<CertTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.keypairs.tabs.tab2">
                <RichTextField source="pub_cert" />
            </Tab>
            <Tab label="resources.keypairs.tabs.tab3">
                <RichTextField source="pub_key" />
                <RichTextField source="prv_key" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);



