import { AnimatePresence, motion } from "framer-motion";
import Button from "../button";

export default function HasChangesNotice({ onCancel, onConfirm, hasChanges, loading }: {
    onCancel: () => void;
    onConfirm: () => void;
    hasChanges: boolean;
    loading: boolean;
}) {
    return(
        <AnimatePresence>
            {hasChanges && (
                <motion.div 
                    initial={{ top: '100%' }}
                    animate={{ top: 'calc(100% - 6rem)' }}
                    exit={{ top: '100%' }}
                    className="p-3 w-[800px] max-w-main fixed left-2/4 -translate-x-2/4"
                >
                    <div className="p-3 flex items-center justify-between bg-primary rounded-md shadow-md">
                        <span>
                            Changes have been detected.
                        </span>
                        <div className="flex gap-2">
                            <button 
                                className="p-3 text-sm hover:bg-secondary active:bg-tertiary transition-colors rounded-md"
                                disabled={loading}
                                onClick={onCancel}
                                type="button"
                            >
                                Cancel
                            </button>
                            <Button 
                                className="p-3 text-sm font-semibold"
                                disabled={loading}
                                onClick={onConfirm}
                            >
                                {loading ? 'Saving changes...': 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}