export const checkPermissions = (req, res, permissions) => {
    if (req.user.rol_id < permissions) {
        return new Error("No se tienen permisos");
    }
};
