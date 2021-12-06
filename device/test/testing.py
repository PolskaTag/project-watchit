import unittest
import helperfuncs as hf
import pifuncs as pf

class Tests(unittest.TestCase):

    def test_filesplit(self):
        msg = 'Filesplit not equal.'
        self.assertEqual(hf.filesplit('project-watchit\device\input.txt'), ['1', '2', '3', '4', '5'], msg)
        self.assertEqual(hf.filesplit('project-watchit\device\input2.txt'), [''], msg)        

    def test_videocount(self):
        msg = 'Not the max'
        self.assertEqual(hf.video_count(), 105, msg)
        self.assertNotEqual(hf.video_count(), 104, msg)
    
    def test_parseUDA(self):
        msg = 'Wrong UDA'
        self.assertEqual(pf.parseUDA({"user": "me", "number": 5}), [["user", "me"],["number", 5]], msg)
        self.assertNotEqual(pf.parseUDA({"user": "me", "number": 5}), [["user", "me"],["number", "5"]], msg)

if __name__ == '__main__':
    unittest.main()