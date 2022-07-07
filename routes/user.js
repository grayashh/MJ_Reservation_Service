const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// 로그인
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.send('로그인 실패');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send('로그인 성공');
    });
  })(req, res, next);
});

// 회원가입
router.post('/join', async (req, res, next) => {
  const { name, phone, id: user_id, password } = req.body;
  try {
    await User.create({
      name,
      phone,
      user_id,
      password
    });
    res.send('회원가입 성공');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
