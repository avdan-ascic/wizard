import UserInformation from "../models/userInformation.model";
import Car from "../models/car.model";

const create = async (req, res, next) => {
  try {
    const userInfo = new UserInformation(req.body.userInfo);

    userInfo.userId = req.user._id;

    const car = new Car(req.body.car);
    const savedCar = await car.save();

    userInfo.carId = savedCar._id;

    const savedUser = await userInfo.save();

    res.status(200).json({ userInfo: savedUser, car: savedCar });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const read = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User not found!");

    const userInfo = await UserInformation.findOne({ userId: user._id });
    if (!userInfo)
      return res
        .status(200)
        .json({ message: "User information was not found!" });
    const car = await Car.findById(userInfo.carId);
    if (!car)
      return res
        .status(200)
        .json({ message: "User information was not found!" });

    res.status(200).json({ userInfo: userInfo, car: car });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    let userInfo = await UserInformation.findById(req.body.userInfo.id);
    if (!userInfo)
      return res
        .status(200)
        .json({ message: "User information was not found!" });
    userInfo.firstName = req.body.userInfo.firstName;
    userInfo.lastName = req.body.userInfo.lastName;
    userInfo.country = req.body.userInfo.country;
    userInfo.phoneNumber = req.body.userInfo.phoneNumber;
    userInfo.gender = req.body.userInfo.gender;
    userInfo.dateOfBirth = req.body.userInfo.dateOfBirth;
    userInfo.addInfo = req.body.userInfo.addInfo;

    let car = await Car.findById(req.body.car.id);
    if (!car)
      return res
        .status(200)
        .json({ message: "User information was not found!" });
    car.make = req.body.car.make;
    car.model = req.body.car.model;
    car.year = req.body.car.year;
    car.regPlate = req.body.car.regPlate;

    await userInfo.save();
    await car.save();

    res.status(200).json({ message: "User information updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    await UserInformation.findByIdAndDelete(req.body.userInfoId);
    await Car.findByIdAndDelete(req.body.carId);

    res.status(200).json({ message: "User information deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export default { create, read, update, remove };
