import React from 'react';

interface WithLoadingSkeletonProps {
    loading: boolean;
}

const WithLoadingSkeleton = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    Skeleton: React.ComponentType,
): React.FC<P & WithLoadingSkeletonProps> => {
    const ComponentWithLoadingSkeleton: React.FC<P & WithLoadingSkeletonProps> = ({
        loading,
        ...props
    }: WithLoadingSkeletonProps) => {
        if (loading) {
            return <Skeleton />;
        }
        return <WrappedComponent {...(props as P)} />;
    };

    ComponentWithLoadingSkeleton.displayName = `WithLoadingSkeleton(${getDisplayName(WrappedComponent)})`;

    return ComponentWithLoadingSkeleton;
};
function getDisplayName<P>(WrappedComponent: React.ComponentType<P>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default WithLoadingSkeleton;