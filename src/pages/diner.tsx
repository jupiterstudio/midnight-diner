/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Diner.module.css';

const Diner: React.FC = () => {
  const [dialog, setDialog] = useState<string[]>([
    'Welcome to Midnight Diner!',
    'What would you like to talk about today?',
    'Feel free to ask anything!',
  ]);
  const [currentDialog, setCurrentDialog] = useState(0);

  const handleNextDialog = () => {
    if (currentDialog < dialog.length - 1) {
      setCurrentDialog(currentDialog + 1);
    }
  };

  const dialogVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className={styles.container} onClick={handleNextDialog}>
      <div className={styles.npc}>
        <img src="/images/chef.png" alt="Owner" className={styles.npcImage} />
      </div>
      <motion.div
        key={currentDialog} // Key helps Framer Motion detect when content changes
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dialogVariants}
        transition={{ duration: 0.5 }}
        className={styles.dialogBox}
      >
        <p>{dialog[currentDialog]}</p>
      </motion.div>
    </div>
  );
};

export default Diner;
