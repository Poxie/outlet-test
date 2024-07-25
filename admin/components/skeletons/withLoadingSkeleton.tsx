import React from 'react';

interface WithLoadingSkeletonProps {
    loading: boolean;
}

const withLoadingSkeleton = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    Skeleton: React.ComponentType,
): React.FC<P & WithLoadingSkeletonProps> => ({
    loading,
    ...props
}: WithLoadingSkeletonProps) => {
    if(loading) {
        return <Skeleton />;
    }
    return <WrappedComponent {...(props as P)} />;
};

export default withLoadingSkeleton;