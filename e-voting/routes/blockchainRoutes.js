import express from 'express';

const router = express.Router();

router.get('/validate', async (req, res) => { 
    try {
        const fetchResponse = await fetch('http://localhost:5005/is_valid'); 
        if (!fetchResponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await fetchResponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/voting_percentage', async (req, res) => { 
    try {
        const fetchResponse = await fetch('http://localhost:5005/voting_percentage'); 
        if (!fetchResponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await fetchResponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/voting_percentage/:id', async (req, res) => { 
    try {
        const id = req.params.id;
        const fetchResponse = await fetch(`http://localhost:5005/voting_percentage/${id}`); 
        if (!fetchResponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await fetchResponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/restore', async (req, res) => { 
    try {
        const fetchResponse = await fetch('http://localhost:5005/restore_blockchain', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!fetchResponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await fetchResponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/reset_blockchain', async (req, res) => { 
    try {
        const fetchResponse = await fetch('http://127.0.0.1:5005/reset_blockchain', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!fetchResponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await fetchResponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/mine_block', async (req, res) => { 
    try {
        const body = req.body;
        const fetchResponse = await fetch('http://localhost:5005/mine_block', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!fetchResponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await fetchResponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/results', async(req, res)=>{
    try{
        const rresponse = await fetch('http://localhost:5005/vote_count');
        if (!rresponse.ok) {
            throw new Error('Something went wrong');
        }
        const data = await rresponse.json(); 
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
})

export default router;
