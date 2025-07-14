import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAccountSettings,
  updateAccountSettings,
  clearSettingsSuccess,
  clearSettingsError,
} from '../settingsSlice';

export default function useSettingsState() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const settings = useSelector((state) => state.settings);

  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState({ full_name: '', company: '' });
  const [original, setOriginal] = useState({ full_name: '', company: '' });
  const lastFetchedUserId = useRef(null);

  useEffect(() => {
    if (!authUser?.id) return;
    if (!settings.fetched || lastFetchedUserId.current !== authUser.id) {
      dispatch(fetchAccountSettings(authUser.id));
      lastFetchedUserId.current = authUser.id;
    }
  }, [authUser?.id, dispatch]);

  // Sync local state with Redux state
  useEffect(() => {
    if (settings.fetched) {
      setFields({
        full_name: settings.full_name || '',
        company: settings.company || '',
      });
      setOriginal({
        full_name: settings.full_name || '',
        company: settings.company || '',
      });
    }
  }, [settings.fetched, settings.full_name, settings.company]);

  // Detect if there are real changes (ignoring whitespace)
  const hasChanges =
    fields.full_name.trim() !== original.full_name.trim() ||
    fields.company.trim() !== original.company.trim();

  const handleEdit = useCallback(() => setEditMode(true), []);
  const handleCancel = useCallback(() => {
    setFields(original);
    setEditMode(false);
    dispatch(clearSettingsError());
  }, [original, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!authUser?.id) return;
    await dispatch(
      updateAccountSettings({
        user_id: authUser.id,
        full_name: fields.full_name.trim(),
        company: fields.company.trim(),
      })
    );
    setEditMode(false);
  };

  // Auto-clear success after 2s
  useEffect(() => {
    if (settings.success) {
      const timer = setTimeout(() => {
        dispatch(clearSettingsSuccess());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [settings.success, dispatch]);

  // Auto-clear error after 3s
  useEffect(() => {
    if (settings.error) {
      const timer = setTimeout(() => {
        dispatch(clearSettingsError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [settings.error, dispatch]);

  return {
    fields,
    setFields,
    editMode,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave,
    hasChanges,
    loading: settings.loading,
    error: settings.error,
    success: settings.success,
    email: settings.email,
    full_name: fields.full_name,
    company: fields.company,
    fetched: settings.fetched,
  };
} 