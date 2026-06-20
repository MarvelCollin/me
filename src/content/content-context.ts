import { createContext } from 'react';
import type { ContentState } from '../Interface/IContentState';

export const ContentContext = createContext<ContentState | null>(null);
