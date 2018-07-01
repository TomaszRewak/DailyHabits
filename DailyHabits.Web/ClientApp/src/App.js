import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import HistoryManager from './components/history-manager/HistoryManager';

export default () => (
	<Layout>
		<Route path='/' component={HistoryManager} />
	</Layout>
);
