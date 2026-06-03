export const LANGUAGE_COLORS: Record<string, { text: string; badge: string; corner: string }> = {
    TypeScript: { text: 'text-blue-500', badge: 'text-blue-700 border-blue-200 bg-blue-50', corner: 'bg-blue-500' },
    JavaScript: { text: 'text-amber-500', badge: 'text-amber-700 border-amber-200 bg-amber-50', corner: 'bg-amber-500' },
    Python: { text: 'text-green-500', badge: 'text-green-700 border-green-200 bg-green-50', corner: 'bg-green-500' },
    PHP: { text: 'text-purple-500', badge: 'text-purple-700 border-purple-200 bg-purple-50', corner: 'bg-purple-500' },
    JSON: { text: 'text-pink-500', badge: 'text-pink-700 border-pink-200 bg-pink-50', corner: 'bg-pink-500' },
}

export function getLanguageColors(language?: string | null) {
    return language ? (LANGUAGE_COLORS[language] ?? null) : null;
}