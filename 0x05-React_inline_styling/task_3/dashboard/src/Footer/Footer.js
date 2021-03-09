import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';

function Footer() {
	return (
		<div className={css(styles.footer)}>
			<p className={css(styles.p)}>Copyright {getFullYear()} - {getFooterCopy()}</p>
		</div>
	);
}

const styles = StyleSheet.create({
	footer: {
		// position: 'absolute',
		// bottom: '0',
		width: '100%',
	},
	p: {
		textAlign: 'center',
		borderTop: '3px solid var(--holberton-red)',
		padding: '16px 0',
	},
});

export default Footer;
