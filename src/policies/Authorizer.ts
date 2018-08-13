import jwt = require("jsonwebtoken");
import { Request, Response, Next } from "restify";
import _ = require("lodash");
import { logger } from "./InitApp";

export function IsAuthenticated(req: Request, res: Response, next: Next): any {
  let token = req.headers["at"] || req.params.at;
  try {
    // check header or url parameters or post parameters for token

    // if (!token && req.body && req.body.token) {
    //   token = req.body.token; // check in req body
    // }

    // decode token
    if (!_.isNil(token)) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
          if (err.message && err.message === "jwt expired") {
            return res.json({ success: false, message: "Token expired." });
          }

          return res.json({ success: false, message: "Failed to authenticate token." });
        } else {
          // if everything is good, save to request for use in other routes
          // req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.send(403, {
        success: false,
        message: "No token provided."
      });
    }
  } catch (error) {
    logger.error("IsAuthenticate", error, token);
    return res.send(403, {
      success: false,
      message: "No token provided."
    });
  }
}

//   export async function TokenRefresh(req: restify.Request, res: restify.Response, next: restify.Next): Promise<any> {
//     let session;
//     let user;
//     try {
//       // check header or url parameters or post parameters for token
//       let token = req.headers["x-access-token"] || req.params.token;

//       if (!token && req.body && req.body.token) {
//         token = req.body.token; // check in req body
//       }

//       // decode token
//       if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, process.env.SECRET, async (err, decoded) => {
//           if (err) {
//             if (err.message !== "jwt expired") {
//               return res.json({ success: false, message: err.message });
//             }
//             user = jwt.decode(token);
//           } else {
//             user = decoded;
//           }

//           // if (!decoded) {
//           //     return res.json({ success: false, message: "Invalid Token. (don't send 'string' or invalid string)." });
//           // }

//           // create a token
//           let jwtOptions = <jwt.SignOptions>{};
//           jwtOptions.expiresIn = "7d";
//           jwtOptions.noTimestamp = false;
//           session = driver.session();

//           let query = `MATCH (a:User {UserID: '${user.UserID}'}) RETURN a`;
//           let existingUser = await session.run(query);

//           session.close();
//           if (existingUser.records.length > 0) {
//             let userInfo = existingUser.records[0]._fields[0].properties;

//             let userObj = user;
//             let newDate = new Date();

//             userObj.TokenDate = newDate.getTime();
//             userObj.FirstName = userInfo.FirstName;
//             userObj.LastName = userInfo.LastName;
//             userObj.Email = userInfo.Email;

//             // if (!_.isNil(userInfo.Gender))
//             //     userObj.Gender = userInfo.Gender;

//             // if (!_.isNil(userInfo.DOB)) {
//             //     try {
//             //         if (userInfo.DOB)
//             //             userObj.DOB = userInfo.DOB.toNumber();
//             //     } catch (error) {
//             //         this.log.warn("Wierd DOB for user " + userObj.Email, userObj.DOB);
//             //         userObj.DOB = -2495836800000;
//             //     }
//             // }
//             // else {
//             //     userObj.DOB = -2495836800000;
//             // }
//             // if (!_.isNil(userInfo.Country))
//             //     userObj.Country = userInfo.Country;

//             // if (!_.isNil(userInfo.City))
//             //     userObj.City = userInfo.City;

//             // if (!_.isNil(userInfo.Phone))
//             //     userObj.Phone = userInfo.Phone;

//             if (!_.isNil(userInfo.FieldOfStudy)) userObj.FieldOfStudy = userInfo.FieldOfStudy;

//             if (!_.isNil(userInfo.IsFirstLogin)) userObj.IsFirstLogin = userInfo.IsFirstLogin;

//             delete userObj.exp;
//             delete userObj.iat;
//             delete userObj.City;
//             delete userObj.Gender;
//             delete userObj.Phone;
//             delete userObj.DOB;
//             delete userObj.Country;
//             delete userObj.GoogleId;
//             delete userObj.FBId;
//             delete userObj.LinkedinId;
//             let newToken = jwt.sign(userObj, authConfig.secret, jwtOptions);

//             await new uRService.UserRedisService().SetUserLastLogin(user.UserID);

//             return res.json({ success: true, message: "New Refreshed Token", token: newToken, userInfo: userObj, tokenExipreDate: newDate.setDate(newDate.getDate() + 7) });
//           } else {
//             return res.json({ success: false, message: "No User Found" });
//           }
//         });
//       } else {
//         // if there is no token
//         // return an error

//         return res.send(403, {
//           success: false,
//           message: "No token provided."
//         });
//       }
//     } catch (error) {
//       logger.error(" Refresh token ", error);
//       return res.send(500, {
//         success: false,
//         message: "Token invalid"
//       });
//     }
//   }
