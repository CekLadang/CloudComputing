const express = require('express');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore and Router
const router = express.Router();
const firestore = new Firestore();
const historyCollection = firestore.collection('history');

// Get all history records
router.get('/', async (req, res) => {
  try {
    const snapshot = await historyCollection.get();
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

// Add a new history record
router.post('/', async (req, res) => {
  try {
    const { plantName, diseaseName, date, imageUrl } = req.body;
    if (!plantName || !diseaseName || !date) {
      return res.status(400).json({ message: 'plantName, diseaseName, and date are required' });
    }
    const newRecord = {
      plantName,
      diseaseName,
      date: new Date(date),
      imageUrl: imageUrl || null,
    };
    const docRef = await historyCollection.add(newRecord);
    res.status(201).json({ id: docRef.id, ...newRecord });
  } catch (error) {
    console.error('Error adding history record:', error);
    res.status(500).json({ message: 'Failed to add history record' });
  }
});

// Get a single history record by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await historyCollection.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'History record not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching history record:', error);
    res.status(500).json({ message: 'Failed to fetch history record' });
  }
});

// Delete a history record by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await historyCollection.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'History record not found' });
    }
    await historyCollection.doc(id).delete();
    res.status(200).json({ message: 'History record deleted successfully' });
  } catch (error) {
    console.error('Error deleting history record:', error);
    res.status(500).json({ message: 'Failed to delete history record' });
  }
});

// Update a history record by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { plantName, diseaseName, date, imageUrl } = req.body;
    const docRef = historyCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'History record not found' });
    }
    const updatedRecord = {
      ...(plantName && { plantName }),
      ...(diseaseName && { diseaseName }),
      ...(date && { date: new Date(date) }),
      ...(imageUrl && { imageUrl }),
    };
    await docRef.update(updatedRecord);
    res.status(200).json({ id, ...updatedRecord });
  } catch (error) {
    console.error('Error updating history record:', error);
    res.status(500).json({ message: 'Failed to update history record' });
  }
});

module.exports = router;
