import emailjs from "@emailjs/browser";

const _status = {
    didInit: false,
    config: null
}

export const useEmails = () => {
    /**
     * @param {Object} config
     */
    const init = (config) => {
        emailjs.init(config.publicKey)
        _status.config = config
        _status.didInit = true
    }

    /**
     * @return {boolean}
     */
    const isInitialized = () => {
        return _status.didInit
    }

    /**
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} customSubject
     * @param {string }message
     * @return {Promise<boolean>|Boolean}
     */
    const sendContactEmail = async (fromName, fromEmail, customSubject, message) => {
        if(!isInitialized())
            return

        const params = {
            from_name: fromName,
            from_email: fromEmail,
            custom_subject: customSubject,
            message: message
        }

        try {
            const response = await emailjs.send(
                _status.config['serviceId'],
                _status.config['templateId'],
                params
            )
            /*try {
                const replyParams = {
                    to_name: fromName, // Use the sender's name in the reply if you like
                    to_email: fromEmail,
                    custom_subject:customSubject,
                    // You can add other relevant information here for the reply template
                    // For example: company_name: 'Your Company Name'
                };

                await emailjs.send(
                    _status.config['serviceId'],
                    _status.config['replyTemplateId'], // Use the ID of your reply template
                    replyParams
                );
                
                return true; // Both emails sent successfully
            } catch (replyError) {
                console.error("Failed to send auto-reply:", replyError);
                return true; // Contact email sent, but auto-reply failed (you might want to handle this differently)
            }*/
        } catch (error) {
            return false
        }
    }

    return {
        init,
        isInitialized,
        sendContactEmail
    }
}
