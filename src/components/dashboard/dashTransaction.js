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
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/Cached';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin/lib';
import { Link } from 'react-router-dom';
import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 20,
    },
    titleLink: { textDecoration: 'none', color: 'inherit' },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};
const location = {
    pathname: 'transactions',
    query: { filter: JSON.stringify({ status: 'pending' }) },
};

const dashTransaction = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={ShoppingCartIcon} bgColor="#f44336" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.transaction_info')}
            </Typography>
            <Typography variant="headline" component="h2">
                <Link to={location} className={classes.titleLink}>
                    {value}
                </Link>

            </Typography>
        </Card>
    </div>
);

export default translate(withStyles(styles)(dashTransaction));