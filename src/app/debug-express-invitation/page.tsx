"use client";

import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaCalendarAlt, FaUser, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DebugExpressInvitationPage() {
  const searchParams = useSearchParams();
  
  // Extract parameters from URL
  const assignedTo = searchParams.get('assigned_to') || '';
  const eventTypeName = searchParams.get('event_type_name') || 'Debug Express';
  const eventStartTime = searchParams.get('event_start_time') || '';
  const eventEndTime = searchParams.get('event_end_time') || '';
  const inviteeFirstName = searchParams.get('invitee_first_name') || '';
  const inviteeLastName = searchParams.get('invitee_last_name') || '';
  const inviteeFullName = searchParams.get('invitee_full_name') || '';
  const inviteeEmail = searchParams.get('invitee_email') || '';

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return '';
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris'
      });
    } catch (error) {
      return dateTimeString;
    }
  };

  const formatTime = (dateTimeString: string) => {
    if (!dateTimeString) return '';
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris'
      });
    } catch (error) {
      return dateTimeString;
    }
  };

  const displayName = inviteeFullName || `${inviteeFirstName} ${inviteeLastName}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-white to-accent/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm shadow-2xl border border-accent/20 p-8 sm:p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-6xl text-green-500" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent"
          >
            Rendez-vous confirmé !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 text-center mb-8"
          >
            Merci {displayName}, votre session Debug Express a été planifiée avec succès.
          </motion.p>

          {/* Event Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-accent/5 border border-accent/20 p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
              <FaCalendarAlt />
              Détails du rendez-vous
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaClock className="text-accent/70 w-5 h-5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formatDateTime(eventStartTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Durée: 15 minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaUser className="text-accent/70 w-5 h-5" />
                <div>
                  <p className="font-medium text-gray-900">
                    Avec {assignedTo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Jonathan - Expert A2H
                  </p>
                </div>
              </div>

              {inviteeEmail && (
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-accent/70 w-5 h-5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {inviteeEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email de confirmation envoyé
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/60 border border-accent/20 p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Prochaines étapes
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Vous recevrez un email de confirmation avec le lien de la réunion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Préparez vos questions sur votre projet actuel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Nous analyserons ensemble les améliorations possibles</span>
              </li>
            </ul>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => window.open('https://calendly.com/jonathan-ai2h/30min', '_blank')}
              className="bg-accent text-white px-8 py-4 text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Modifier le rendez-vous
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="border-2 border-accent text-accent px-8 py-4 text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Retour à l'accueil
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            Des questions ? Contactez-nous à{" "}
            <a href="mailto:contact@ai2h.tech" className="text-accent hover:text-accent/80 underline">
              contact@ai2h.tech
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
