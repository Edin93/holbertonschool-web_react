import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const initialState = {
    notifications: [],
    loading: false, 
};

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
    notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const response = await axios.get(ENDPOINTS.notifications);
        const unreadNotifications = response.data.filter(notification => !notification.context.isRead)
            .map(notification => ({
                id: notification.id,
                type: notification.context.type,
                isRead: notification.context.isRead,
                value: notification.context.value,
            }));
        return unreadNotifications;
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        markNotificationAsRead: (state, action) => {
            const notificationId = action.payload;
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== notificationId
            );
            console.log(`Notification ${notificationId} has been marked as read`);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
                state.loading = false;
            })
            .addCase(fetchNotifications.rejected, (state) => {
                state.loading = false; 
            });
    },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
