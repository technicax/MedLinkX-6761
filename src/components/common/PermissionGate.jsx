import { useRBAC } from '../../contexts/RBACContext';

const PermissionGate = ({ permission, permissions, requireAll = false, fallback = null, children }) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useRBAC();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission && hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? (hasAllPermissions && hasAllPermissions(permissions)) 
      : (hasAnyPermission && hasAnyPermission(permissions));
  } else {
    hasAccess = true; // No permission check
  }

  return hasAccess ? children : fallback;
};

export default PermissionGate;