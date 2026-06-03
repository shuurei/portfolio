export const formatProjectName = (name: string) => {
    return name.replace(/-/g, ' ').toUpperCase();
}