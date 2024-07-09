export default function useChanges<T extends Record<string, any>>(previousObject: T | undefined, newObject: T | undefined) {
    if(!previousObject || !newObject) {
        return { changes: {}, hasChanges: false };
    }

    const changes = Object.entries(previousObject).reduce((acc, [key, value]) => {
        const Key = key as keyof T;
        if (newObject[Key] !== value) {
            acc[Key] = value;
        }
        return acc;
    }, {} as Partial<T>);
    
    const hasChanges = Object.keys(changes).length > 0;
    
    return { changes, hasChanges };
}