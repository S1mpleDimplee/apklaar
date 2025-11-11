
const postCall = async (usedFunction, dataSend) => {
    try {
        const response = await fetch(
            "http://localhost/tandartspraktijkBackend/router/router.php",
            {
                method: "POST",
                body: JSON.stringify({
                    function: usedFunction,
                    data: dataSend,
                }),
            });

        const data = await response.json();

        if (data.success) {
            return {
                isSuccess: true,
                message: data.message,
                data: data.data || null
            };

        } else {
            return {
                isSuccess: false,
                message: data.message,
                data: data.data || null
            };
        }
    } catch (error) {
        return {
            isSuccess: false,
            message: error.message,
            data: null
        };
    }
};
export default postCall;