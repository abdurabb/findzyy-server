
const planChecking = async (user) => {
    try {
        if (user?.isPlan) {
            if (user?.planEndDate < new Date()) {
                user.isPlan = false;
                user.role = 'user'
                user.isDetailsAdded = false
                user.planEndDate = null;
                user.categories = []
                await user.save();
                return { success: true, message: "No plans available." };
            }
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    planChecking
}